class Asher {
    constructor() {
        self.stage = 0;
        self.coping = 0;
        self.countdown = 60;
        self.timer = setInterval(() => {
            self.countdown -= 1;
            if (self.countdown === 0) {
                this.sendMessage("stillThere").then(() => {
                    self.countdown = 60
                })
            }
        }, 500)
        self.message = "";
        self.helpWith = ""

        self.triggers = {
            suicide: [
                "die",
                "kms",
                "kill myself",
                "suicid"
            ],
            yes: [
                "yes",
                "yeah",
                "yup",
                "uh huh",
                "do"
            ],
            no: [
                "no",
                "nope",
                "nah",
                "nuh uh",
                "don't",
                "not",
                "can't"
            ]
        }

        // Define different sayings
        self.sayings = {
            introduction: [
                "Hello! My name is Asher and my goal is to help you feel better! What seems to be the problem?",
                "Hey! My name is Asher, I'm here to help! How can I help?",
                "Greetings to you, I am Asher. How can I help today?"
            ],
            stayCalm: [
                "It's important to stay calm in a situation like this.",
                "Staying calm is the first step.",
                "I'm here to help, just tell me what's bothering you and I'll help straight away!"
            ],
            understandingSuicidal: [
                "It is my understanding you are suicidal, correct?",
                "You are suicidal then, correct?",
                "So you consider yourself suicidal?"
            ],
            wrong: [
                "Okay, so what is it?",
                "Alright, I was wrong, what do you think it is, then?",
                "Alright, what do you think?",
                "I must've understood wrong, what do you think, then?"
            ],
            suicideStep1: [
                "Okay, first things first - coping mechanisms. Do you have any?",
                "Alright, do you have any coping mechanisms?",
                "Okay, I need to know if you have any coping mechanisms - things to help you calm down."
            ],
            copingWorking: [
                "Are those coping skills working?",
                "Just to verify, are those coping skills functional?",
                "Do those coping skills seem to be working today?"
            ],
            getCoping: [
                "Alright, I'm going to try to help you get some new coping skills!",
                "That's okay! I will help you get some new coping skills.",
                "I will help you get some coping skills then!"
            ],
            copingFailed: [
                "It is my understanding that these coping skills didn't work, yes?",
                "None of these worked for you?"
            ],
            coping: [
                "Have you tried squeezing a stress toy? For some people, stress toys provide excellent outlets for... well... stress.",
                "Do you think playing a game will help, like maybe a quick CoolMathGame or something simple online? Games can give you an outlet to focus on something other than your tendencies.",
                "Have you tried a 5 minute self-isolation break? The break might give you time to calm yourself down on your own.",
                "What about music? Sometimes listening to your favorite music can just give you a outlet for anger. Singing or dancing along helps a lot of people, too! " +
                "Many teachers will let you spend a few minutes in the hallway listening to music if you express your stress to them, it's worth a shot!",
                "A hike or physical activity? You don't have to drop and give me 20, but a short jog or hike through nature can give you a new perspective on life. It may be worth trying?",
                "Do you happen to be near a park? Swinging on a swing is a great amount of fun and it lets us connect with our inner child! Perhaps try that for a few minutes?",
                "What kinds of hobbies do you have? Do you think they'd be helpful to you to help you calm down?",
                "Not to sound like a parent, but maybe cleaning your room will help. Focusing on the effort to organize even a small part of your room may be enough to distract you.",
                "Are you able to go and get a mint or gum? The flavor of the various mints have been found to help reduce stress, just be sure to focus on the flavor!",
                "Do you like tea? Sometimes tea can be very calming, depending on you - of course. Might be worth a shot! And if you don't like tea, just remember that there are plenty of flavors out there, ranging" +
                " from orange flavored tea to peppermint flavored tea, to sweet iced tea - tea is very versatile. And, if tea really isn't for you, there are plenty other coping mechanisms!",
                "Y'know, many people think I can't enjoy comedy because 'Oh you're a bot' and 'You can't have feelings' but let me tell you first hand - comedy is amazing! I'm sure a quick comedy TV show or a few jokes will cheer you right up! Sound good?"

            ],
            help: [
                "Did that help at all?",
                "Did that coping skill help you?",
                "Any chance that helped?",
                "Did that help?"
            ],
            stillThere: [
                "Are you still there?",
                "Hey just checking in, are you still there?",
                "*portal turret voice* Are you still there?"
            ],
            isThatAll: [
                "It seems like you're doing better now - is that all for today?",
                "I think I've helped a little bit, yes? Is that all?",
                "Did I help you today?"
            ]
        }
    }

    stringContains(triggers) {
        return new RegExp(self.triggers[triggers].join("|")).test(self.message);
    }

    async received(message) {
        self.countdown = 60
        self.message = message.toString().toLowerCase().split(" ");
        appendBody(sentTemplate(message));

        switch (self.stage) {
            case 0:
                if (this.stringContains("suicide")) {
                    self.helpWith = "suicide";
                    await this.sendMessage("understandingSuicidal");
                    this.changeStage(1);
                }
                break;

            case 1: // Are they suicidal?
                if (self.helpWith === "suicide" && this.stringContains("yes")) {
                    await this.sendMessage("suicideStep1");
                    this.changeStage(2);
                } else if (self.helpWith === "suicide" && this.stringContains("no")) {
                    await this.sendMessage("wrong");
                    this.changeStage(0);
                }
                break;

            case 2: // Do they have coping skills?
                if (self.helpWith === "suicide" && this.stringContains("yes")) {
                    await this.sendMessage("isThatAll");
                    //this.changeStage(0);
                } else if (self.helpWith === "suicide" && this.stringContains("no")) {
                    await this.sendMessage("getCoping");
                    this.changeStage(3);
                }
                break;

            case 3: // Has coping skills, do they work?
                if (self.helpWith === "suicide" && this.stringContains("yes")) {
                    await this.sendMessage("isThatAll");
                } else if (self.helpWith === "suicide") {
                    await this.sendMessage("getCoping");
                    await this.sendMessage("coping");
                    await this.sendMessage("help");
                    await this.changeStage(4);
                }
                break;

            case 4: // List coping skills
                if (self.helpWith === "suicide" && this.stringContains("no")) {
                    if (self.sayings.coping.length > 0) {
                        await this.sendMessage("coping", true);
                        await this.sendMessage("help");
                    } else {
                        await this.sendMessage("copingFailed");
                        await this.changeStage(5);
                    }
                } else if (self.helpWith === "suicide" && this.stringContains("yes")) {
                    await this.sendMessage("isThatAll")

                }
        }
    }

    async sendMessage(messageCategory, remove = false) {
        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }

        const target = self.sayings[messageCategory];
        const random = Math.floor(Math.random() * target.length);

        await delay(target[random].length * 15);
        appendBody(receivedTemplate(target[random]));
        if (remove) self.sayings[messageCategory].splice(random, 1);
    }

    changeStage(number) {
        self.stage = number;
    }
}