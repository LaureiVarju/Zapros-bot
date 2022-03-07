const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Tells you a corny joke!'),
	async execute(interaction) {
		return interaction.reply(tell_joke())
	}
};

function tell_joke() {
	let random_number = Math.floor(Math.random() * jokes.length);
	console.log(jokes[random_number])
	return (jokes[random_number])
}

let jokes = [
	"Why can't a leopard hide?\nBecause he's always spotted.",
	"What do you call an illegally parked frog?\nToad.",
	"How do moths swim?\n Using the butterfly stroke.",
	"How many tickles does it take to make an octopus laugh?\n10 tickles.",
	"Do you know the story about the chicken that crossed the road? \n Me neither, I couldn't follow it.",
	"What do you get from a pampered cow?\nSpoiled milk!",
	"Where do baby cats learn to swim?\nThe kitty pool.",
	"Why are spiders so smart?\n They can find everything on the web.",
	"How can a leopard change his spots?\n By moving.",
	"What did the duck say when it bought chapstick?\n'Put it on my bill!'",
	"What does a cow use to do math?\n A cow-culator.",
	"What would bears be without the letter B? \nEars.",
	"What do you get if you cross an angry sheep with a moody cow? \nAn animal that's in a baaaaaaaaad moooooooood.",
	"Can a kangaroo jump higher than the Empire State Building?\nOf course! Buildings can't jump.",
	"What did the alpaca say to his date?\n'Want to go on a picnic? Alpaca lunch.'",
	"Why do seagulls fly over the sea? \n If they flew over the bay, they'd be called bagels.",
	"Why are snails bad at racing? \n They're sluggish.",
	"What do you call a penguin in the White House? \nLost.",
	"What do you call a kangaroo's lazy joey? \nA pouch potato.",
	"How does a boar sign its name?\n With a pig pen.",
	"Why should you never trust a carp's excuse? \nThey always seem a little fishy.",
	"Did you hear that I'm reading a book about anti-gravity?\n It's impossible to put down.",
	"Which is faster, hot or cold?\n Hot, because you can catch a cold.",
	"What's brown and sounds like a bell?\n Dung!",
	"What did the photon say when asked if she needed to check a bag?\n 'No thanks, I'm traveling light!'",
	"How do you organize a space party? \n You planet.",
	"Did you know milk is the fastest liquid on earth? \n It's pasteurized before you even see it.",
	"What did one ocean say to the other ocean? \n Nothing, they just waved.",
	"Why did everyone enjoy being around the volcano? \n It's just so lava-ble.",
	"What kind of music do the planets listen to?\nNep-tunes!",
	"What did the big flower say to the tiny flower?\n“Hey there bud!”",
	"Why are skeletons so calm?\nBecause nothing gets under their skin.",
	"What did Mars ask Saturn?\n“Hey, can you give me a ring some time?”",
	"Why can't you trust an atom?\nBecause they make up everything.",
	"What do clouds do when they become rich?\nThey make it rain!",
	"Why shouldn't you make fun of a paleontologist?\nBecause you will get Jurasskicked.",
	"Want to hear a potassium joke?\nK.",
	"Why are helium, curium, and barium the medical elements?\nBecause if you can't heal-ium or cure-ium, you bury-um.",
	"How did the chemist feel about oxygen and potassium hanging out?\nOK.",
	"What is it called when Silver Surfer and Iron Man team up?\nAlloys.",
	"What does a baby computer call his father?\nData.",
	"Did you hear about the power outlet that got into a fight with a power cord?\nHe thought he could socket to him.",
	"Why did the computer have no money left?\nSomeone cleaned out its cache!",
	"What's a computer's favorite snack?\nMicrochips!",
	"What do you call monkeys with a shared Amazon account?\nPrime mates.",
	"Why should you never use “beef stew” as a password?\nIt's not stroganoff.",
	"What do you call your grandma's number on speed dial?\nInstagram.",
	"What's another name for an iPhone power cord?\nApple juice.",
	"What do you call a TV vaccination?\nA screen-shot.",
	"Why did the PowerPoint presentation cross the road?\nTo get to the other slide.",
	"Why did the computer always play “Someone Like You?”\nIt was a Dell.",
	"Why did the laptop show up late to school?\nIt had a hard drive.",
	"What do you call an iPhone with no sense of humor?\nToo Siri-ous.",
	"Why was the cell phone's camera blurry?\nIt had lost its contacts.",
	"Why was the man fired from the keyboard factory?\nHe wasn't working with enough shifts.",
	"Why couldn't the computer buy a new pair of jeans?\nIt had spent all its cache.",
	"Why do smartphones ring?\nBecause they can't talk.",
	"What do you call a fake noodle?\nAn impasta.",
	"Why didn't the melons get married?\nBecause they cantaloupe.",
	"Why couldn't the sesame seed get off the hill?\nIt was on a roll.",
	"What kind of egg did the evil chicken lay?\nA deviled egg.",
	"Why is the hot pepper the nosiest vegetable?\nIt can't help but get jalapéno space.",
	"Why do crabs never share their lobsters?\nThey're shellfish.",
	"What do you call a happy camper?\nA Jolly Rancher.",
	"Why are mushrooms always invited to parties?\nThey're a fungi.",
	"What do you call a fancy seafood meal?\nSo-fish-ticated.",
	"What do you call a sad strawberry?\nA blueberry.",
	"Why did the banana go to the hospital?\nHe wasn't peeling well.",
	"What do you call a pig that knows karate?\nA pork chop.",
	"Where do pancakes rise?\nIn the yeast.",
	"What is a mummy's favorite food?\nWraps.",
	"What kind of fruit do you bring while sailing?\nNaval oranges.",
	"What do frogs order at restaurants?\nFrench flies.",
	"What do you call a fake noodle?\nImpasta.",
	"What's orange and sounds like a parrot?\nA carrot.",
	"How do I look?\nWith your eyes.",
	"How do you get a country girl's attention?\nA tractor.",
	"Why is the cemetery so popular?\nPeople are just dying to get in there!",
	"What was the child who wouldn't nap guilty of?\nResisting a rest!",
	"Where do cows go for entertainment?\nTo the moovies.",
	"What did the zero say to the eight?\n“Nice belt.”",
	"What do you call a pile of cats?\nA meow-tain.",
	"What do you call a flea in France?\nA paris-ite.",
	"What runs around a baseball field but never moves?\nA fence.",
	"Why was the calendar afraid?\nIts days were numbered.",
	"What time did the man go to the dentist?\nTooth hurt-y.",
	"Why didn't the skeleton climb the mountain?\nIt didn't have the guts.",
	"My dad told me a joke about boxing.\nI guess I missed the punch line.",
	"What kind of car does an egg drive?\nA yolkswagen.",
	"How do you follow Will Smith in the snow?\nYou follow the fresh prints.",
	"How do celebrities stay cool?\nThey have many fans.",
	"What do you call it when Batman skips church?\nChristian Bale.",
	"What's Forrest Gump's Facebook password?\n1forest1.",
	"Did you hear about the man who fell into an upholstery machine?\nHe's fully recovered.",
	"Why did the coach go to the bank?\nTo get his quarter back.",
	"Why does Snoop Dogg always carry an umbrella?\nFo' drizzle.",
	"What did the fisherman say to the magician?\n“Pick a cod, any cod.”",
	"What do you call a security guard outside of a Samsung store?\nGuardians of the Galaxy.",
	"Why can't you give Elsa a balloon?\nBecause she'd just let it go.",
	"How does Reese eat cereal?\nWitherspoon.",
	"What do you call a nearsighted cowboy?\nSquint Eastwood.",
	"Why did the Jedi cross the road?\nTo get to the dark side.",
	"What do you call a freshly fallen tree?\nDie Hard.",
	"Did you hear about the new pirate movie?\nIt's rated “Arrrrrrr.”",
	"Which bear is the most condescending?\nA pan-duh!",
	"What kind of noise does a witch's vehicle make?\nBrrrroooom, brrroooom."
]

