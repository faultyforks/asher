class Asher {
    constructor() {
        self.stage = 0;
        // self.coping = 0;
        self.countdown = 300;
        self.timer = setInterval(() => {
            self.countdown -= 1;
            if (self.countdown === 0) {
                this.sendMessage("stillThere").then(() => {
                    self.countdown = 300
                })
            }
        }, 1000)
        self.message = "";
        self.helpWith = "";
        self.notificationObject = document.getElementById("notification");
        self.typingObject = document.getElementById("typing")

        self.triggers = {};
        self.sayings = {};
    }

    stringContains(triggers) {
        return new RegExp(self.triggers[triggers].join("|")).test(self.message);
    }

    async received(message) {
        self.countdown = 300
        self.message = message.toString().toLowerCase().split(" ");
        appendBody(sentTemplate(message));

        switch (self.stage) {
            case 0:
                if (this.stringContains("suicide")) {
                    self.helpWith = "suicide";
                    await this.sendMessage("understandingSuicidal");
                    this.stage(1);
                    this.setOptions(["Yes", "No"])
                } else {
                    await this.sendMessage("whatToSay")
                }
                break;

            case 1: // Are they suicidal?
                if (self.helpWith === "suicide" && this.stringContains("yes")) {
                    await this.sendMessage("suicideStep1");
                    this.setOptions(["Yes", "No"])
                    this.stage(2);
                } else if (self.helpWith === "suicide" && this.stringContains("no")) {
                    await this.sendMessage("wrong");
                    this.setOptions(["Yes", "No"])
                    this.stage(0);
                }
                break;

            case 2: // Do they have coping skills?
                if (self.helpWith === "suicide" && this.stringContains("yes")) {
                    await this.sendMessage("copingWorking");
                    this.setOptions(["Yes", "No"])
                    //this.changeStage(0);
                } else if (self.helpWith === "suicide" && this.stringContains("no")) {
                    await this.sendMessage("getCoping");
                    this.setOptions(["OK"])
                    this.stage(3);
                }
                break;

            case 3: // Has coping skills, do they work?
                if (self.helpWith === "suicide" && this.stringContains("yes")) {
                    await this.sendMessage("isThatAll");
                    this.setOptions(["Yes", "No"])
                } else if (self.helpWith === "suicide" && (this.stringContains("no") || this.stringContains("okay"))) {
                    await this.sendMessage("coping");
                    await this.sendMessage("help");
                    this.setOptions(["Yes", "No"])
                    this.stage(4);
                }
                break;

            case 4: // List coping skills
                if (self.helpWith === "suicide" && this.stringContains("no")) {
                    if (self.sayings.coping.length > 0) {
                        await this.sendMessage("coping", true);
                        await this.sendMessage("help");
                        this.setOptions(["Yes", "No"])
                    } else {
                        await this.sendMessage("copingFailed");
                        this.setOptions(["Yes", "No"])
                        this.stage(5);
                    }
                } else if (self.helpWith === "suicide" && this.stringContains("yes")) {
                    await this.sendMessage("isThatAll")

                }
                break;

            case 5: // Coping skills didn't work - try something else
                if (self.helpWith === "suicide" && this.stringContains("no")) {
                    await this.sendMessage("suicide2");
                    await this.sendMessage("preventionPlanDescribe");
                    this.setOptions(["OK"])
                } else if (self.helpWith === "suicide" && this.stringContains("yes")) {
                    await this.sendMessage("isThatAll")
                } else {
                    if (self.sayings.suicidePreventionPlan.length > 0) {
                        await this.sendMessage("suicidePreventionPlan", true, "okay");
                    } else {
                        await this.sendMessage("help");
                        this.stage(6);
                    }
                }
                break;

        }
    }

    async sendMessage(messageCategory, remove = false, preface = "") {
        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }

        const target = self.sayings[messageCategory];
        const random = Math.floor(Math.random() * target.length);

        let prefaceTarget = "";
        let prefaceRandom = "";

        if (preface !== "") {
            prefaceTarget = self.sayings[preface];
            prefaceRandom = Math.floor(Math.random() * prefaceTarget.length);
        }

        self.typingObject.classList.toggle('hidden')
        await delay(target[random].length * 15);
        if (preface !== "") {
            appendBody(receivedTemplate(prefaceTarget[prefaceRandom] + " " + target[random]));
        } else {
            appendBody(receivedTemplate(target[random]));
        }
        if (remove) self.sayings[messageCategory].splice(random, 1);
        self.notificationObject.pause()
        self.notificationObject.play()
        self.typingObject.classList.toggle('hidden')
    }

    set stage(number) {
        self.stage = number;
    }

    setOptions(options) {
        if (options === "textbox") {
            document.getElementById("userInput").innerHTML =
                `<input class="flex items-center h-10 w-full rounded px-3 text-sm bg-yellow-300" id="userInputBox"
                       onsubmit='e.preventDefault();if (inputBox.value !== "") {asher.received(inputBox.value);inputBox.value = "";}' placeholder="Type your message…" type="text">`
        } else {
            document.getElementById("userInputBox").classList.toggle("hidden")
            for (const option of options) {
                document.getElementById("userInput").innerHTML += `
                <button class="btn bg-yellow-500 text-gray-100 p-1 px-3 rounded-full" 
                onclick="asher.received('${option}'); asher.setOptions('textbox')">${option}</button>
                `
            }
        }
    }
}