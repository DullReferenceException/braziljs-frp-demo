# An Outsider's Adventure at BrazilJS 2015

Chris Heilmann opened his talk at BrazilJS 2015 by likening programmers to
rock bands. You have your front-men stars that get all the fame and attention,
but then you have the behind-the-scenes bassists. This analogy struck a chord 
with me (pun intended). I work really hard and am valued for my contributions,
but I am not a known entity in the programmer community. I have not created 
any notable libraries, written programming languages, authored books, or 
architected a killer app. I am not the typical rock star that usually fills 
the speaker's roster at a tech conference as a lowly application developer. 
So imagine my surprise when I got a chance for a second year in a row to be a 
speaker at BrazilJS!

Last year while I was still on my adrenaline high after the conference, I swore
to myself that I would write about the experience since I would probably never
have that sort of opportunity again. But it never happened. So now that I have
a second chance, I've got to do this for sure.

I'm calling this an "outsider's adventure" because I was not only a bassist
hanging out among the rock-star speakers at this conference, but I was also an 
American English speaker among Portuguese Brazilians. And as an outsider, I 
don't have a well-informed perspective on things, so please forgive any 
ignorant statements I may write.

## Preparation

News of the opportunity came on short notice for me; I am not a confident, 
experienced public speaker that can easily whip together a presentation.
I knew that the same sort of bland topic I had last year would not do. The 
line-up and material in BrazilJS 2014 was amazing, so I needed
to step up as much as possible. The good news is that the visa I
had to hurriedly obtain last year was still good for another 10 years, so I
didn't have to take multiple trips to the San Francisco consulate this time.

Last year, I spoke on the CI/CD process used at GoDaddy, which to me was an
exciting, novel thing that revolutionized the way that we deliver software.
Although many attendees told me they found it helpful, I met plenty of 
engineers afterward who were excited to show me their CI/CD technology, and I
knew that my "state of the art" was passe to others. So this time,
I wanted a topic that was more unique, while still being relevant to today's
developers. I decided to talk about Functional Reactive Programming, which is
not something being used at GoDaddy (as far as I know), but is something I, as
a functional programming enthusiast, would love our team to use in our 
application.

The topic of functional programming can be unfortunately dry, with lots of 
academic mathematical jargon, and high amounts of abstraction that can make
it seem impractical to the average developer. It was important to me to
explain, even before getting into the reactive programming parts to reinforce
why functional programming _is_ important and learning it _does_ serve a vital
purpose. Also, I wanted some audience participation and mild entertainment,
key components of any successful tech talk. So I decided to create a simple
game.

(Thanks to Erica and my dear friends for putting up with me being a recluse
on evenings and weekends while I prepared the material!)

## Before the Conference

Seattle is really far from Porto Alegre. After Erica so kindly dropped me off
at a late hour, I flew overnight to Miami, FL, and from there went to Curitiba,
then Porto Alegre. In all, I think it was about 20 hours in the air. The 
organizer that helped our Latin America international team organize the GoDaddy
booth was kind enough to pick me up at 11 PM and get me on a taxi for the
hotel, a huge inconvenience for him since his hotel was near the airport.
Thanks again, Luciano!

The hotel was the Sheraton, which was a comfortable familiarity for this
American. The service was great. I had stupidly not brought any power adapters
with me to this country, but their front desk was able to supply me with a few.
For a nerd like me, home is where your devices are charging and Wi-Fi abounds, 
so I could now finally relax and get some sleep.

For those who haven't stayed in Brazil before, here are some interesting facts:

1. The A/C plugs are really different from what you see either in the US or Europe.
2. The water pressure in the shower is immense; you can really blast your skin clean with their shower heads. Note: Q means hot and F means cold.
3. Do not flush toilet paper! Throw that stuff in the bin. It's really not too gross once you get used to it, but I had to dig some soggy stuff out of the bowl when I accidentally went into autopilot.
4. Brazil is not a country where tips are a thing. Hooray for sanity!

## Conference, Day One

Tomas, my fellow GoDaddy co-worker in the International department who is from
Sao Paulo, was kind enough to meet me early in the morning for breakfast and
hire us a cab to the event. Last year, I thought the venue selected for
BrazilJS was fine, a comfortable theater located in a shopping mall. This year,
it was again located in a mall, but this time we were in a huge room with a 
stage, four projector screens, and many rows of seats. Lively sponsor booths
ringed the room, so everything was in one place. 

Since 2015 marks the 20th year anniversary of the JavaScript language, the theme
was 1995. Nostalgia-inducing music blared over the speakers. Hearing all that
grunge brought happiness to this Seattle-ite "90's kid." There was also a VR
time machine headset (I didn't get to use this), and circa-1995 game consoles
where you could play some Mario Brothers and Sonic. The Back to the Future
decorations were a little anachronistic, but it worked since we were travelling
back in time to the days of JavaScript past. The lights, sound, and decoration
made the atmosphere lively and exciting. Kudos to the organizers!

The booths were also a lot of fun. The GoDaddy booth had some clever contests.
One was a math puzzle. Attendees were given stickers with numbers, and if they
could find a way to combine theirs with others' numbers using any math
operations to create the number "pi," they would win. I think our organizers
were disappointed that this was already solved by 9:30 AM. They also had a
contest for the best response to the question "if you were a JavaScript
function, what would you be?" The winning contestant had something to the
effect of "in my function, love is the constant, and you are the variable."
Eh, programmer humor.

Mozilla, once again, showed up the other sponsors with its display. They had a
barista, beer kegs, another virtual reality helmet, and Web GL games. Show
offs!

The event was kicked off by an unexpected Power Rangers battle enacted by none
other than the organizers themselves in costume. Christian Heilmann then gave
his great opening talk. Douglas Campos was next talking ASTs, and Felipe
Ribeiro told a great story of how Spotify migrated to JavaScript. Damian
Schenkelman taught us about sharing buffers for parallelization, and
Reinaldo Ferraz showed us how to make our sites accessible. Tania Gonzalez
gave a great rundown of the alphabet soup of technology essential for JS
development, and Raphael Amorim recounted his experience writing open source
code for 500 days. Nicolas Bevacqua shared tips on squeezing performance out
of your app, and Nick Desaulniers talked about WASM, SIMD, WebGL2, and more
about shared arrays for making games. David Bryant, the CTO of Mozilla then
concluded the evening's talks.

At the end of the first day's talks, we had a chance to do a "dry run" and
test our slides out with the A/V equipment. I had quite a panic when I noted
that, while I could connect to the Wi-Fi provided for speakers, I could not
open up my slide show at all, nor the game which was hosted on the Internet. I
was ready to, in despair, go to my room and hurriedly come up with a plan B for
my presentation by moving my slides to something on my local machine and
figuring out how to present the demo without audience participation. To my
huge relief, the organizers were able to provide a trusty Ethernet cable that
got me all the Internet I needed, so I could relax and enjoy an evening out
with the speakers.

## First Evening

I was pleased that once again, the organizers treated the speakers to dinner at
the same place as last year, Galpão Crioul Churrascaria Comidas Campeiras. 
This place is great. The food is basically the same as what you get at a
"Brazilian restaurant" in the US as well as music, dance, and bolas. If you 
haven't been to a Brazilian restaurant, it's quite a thing. An all-you-can-eat
ordeal, you can fill your plate at a salad bar, and waiters bring big skewers 
of various meats (mostly beef) to the tables. If you opt in for a meat 
selection, they slice off a hunk for you, which you'll grab with a pair of
tongs to put on your plate. There was chicken heart (yum!), lamb, chicken, and
lots of beef, including the famous picanha (top sirloin cap), There was also
plenty of drinks to be had of course.

The dancing was great, with sparking swords being cracked together and clanking
spurs. However, the highlight has to be the guy with the bolas. 
Laurie Voss at our table did well likening him to Animal from the Muppets. He 
swung these things around, screaming with a manic energy. His best
trick was whirling these things around cringe-inducingly close to people's
heads to whip their hair around or knock a cigarette stub out of their
mouths. After performing each feat, he did stylish spin and struck a 
bad-ass pose that is the most Latin-looking thing you can imagine. 

![Animal](http://www.churrascariagalpaocrioulo.com.br/wp-content/uploads/2013/02/IMG_20120715_215212.jpg)

At dinner, there were of course many distinguished individuals. I knew this,
but I don't really follow the celebrities of my industry that closely. I knew
who Brendan Eich was, having seen him while attending other conferences, but at
first I had no idea who I was seated with at dinner. At this English-speaking
end of the table, I was across from some guy named Laurie Voss with an odd 
accent (apparently from Trinidad & Tobago), a young-looking curly-headed 
blond, and a Bohemian-looking individual with a crazy beard who I learned only ever cut his own hair with a
pair of scissors.

The conversation was great. The guy across from me was especially entertaining
and caused many of us to crack up throughout the night. The Aussie was also
fun, but seemed strangely nervous; maybe he's also a fish-out-of-water like me?
I mistakenly speculated. Someone cracked a joke that he wanted to be at the
"cool table" with Brendan Eich and the Mozilla posse, and Laurie retorted,
we've got "substack" (the bearded guy) and Sebastian McKenzie here, so 
_we are_ the cool table. "Substack" sounded familiar, but I couldn't recall 
why. We talked about a variety of things, but at one point, ES6 (or is it  
called JavaScript 2015 now?) was brought up. I was asked how I was using it in 
my project, and I said I was using the awesome Babel transpiler through a 
Webpack plugin. Sebastian started making consolatory remarks about this and 
asked Substack what he thought of Webpack. There was then a round of criticism
about some of its design decisions. It wasn't until the next day's talks when 
I learned that Laurie Voss is the CTO of NPM, Sebastian McKenzie is the
18-year-old prodigy that created BabelJS, and Substack created Browserify (a 
competing project with Webpack).

It seems that Brazilians usually eat really late, so I didn't get back to my
hotel until 1 AM. Then, just to be safe, I also got my slides and game working
on my local machine _just in case_ the Internet thing didn't work out (note to
self, _never put everything on the Internet again_!). Now my main worry was
that the meager amount of sleep I'd be getting would derail everything.

## Day Two

My presentation time was at the perfect time slot. I wish I had more than 30
minutes to present, but given how last-minute my addition was, I'm entirely
grateful I got _something_. The second spot on the second day is perfect
because I got to see how things went for an entire day in order to be prepared
for what to expect, and a talk before me when the A/V kinks for the day could
be worked out. Substack was on before me and took the brunt of testing out the
audio settings.

Watching James Halliday (substack) in action was a thing of beauty. This 
guy's "slides" were him typing at a terminal and navigating around vim. He 
gave a great introduction to logs (specifically content-indexed logs) and 
live-coded apps with the base functionality of Twitter and Flickr all in node,
as well as showing how to tie it all in with torrents (ok, it wasn't all 
live-coded, but a great amount of it was). When he made coding mistakes, it 
took him 0.2 seconds to identify and fix them. You know those ridiculous 
Hollywood "hackers" which achieve unrealistic amounts of tasks with a 
whirlwind of keystrokes? Well, now I have met their real-world match. What an
act to follow.

I honestly don't remember much about my talk. Somehow, despite my introversion,
I get into a fugue state when on stage. All the nervousness melts away, and I
calmly present the material. I do remember that pivotal moment when I invited
the audience to join the game, praying that enough people could connect to
the 'Net and actually participate. Much to my relief, it worked, and it turned
out even better than I expected. Afterward, I was approached by many developers who
told me it was a good presentation that sparked their interest in not just
FRP, but functional programming in general. The adrenaline rush and happiness 
that things worked out made me feel like I was floating in air for the rest of 
the day. Mission accomplished!

Ju Gonçalves gave a talk on functional programming (the all-powerful reduce
function) after mine, which was a good follow-up to my dumbed-down intro. This
was followed by an interesting talk by Diogo Lucas on how JS is used in the
agricultural sector.

The presentation by Laurie Voss was extremely good. I learned a lot of new NPM
commands and gained some insight into what the future held for NPM.
I was really touched with what happened at the very end of the presentation as
well, when he promoted a website for LBGTQ programmers.

If you don't know this about Brazil, there is a legacy of "machismo"
in the culture, which surfaces through things like objectification of women 
and homophobia. Last year, for example, every time I took a taxi, the driver 
would comment on each woman we saw, either insulting her for being ugly or 
leering at the pretty ones. This year, I saw many homophobic epitaphs
graffitied on walls. So the fact that Laurie took the opportunity to reach out
in support for the marginalized was really inspiring. For what it's worth, I
have seen really good signs that efforts are being made to change aspects of
Brazilian culture. I remember last year, during the Mozilla hackathon, 
someone made a crack that a developer that was going to be moving to San 
Francisco was going to be turned gay. He was quickly chided by another 
Brazilian, who called him out on his ignorance. The conference organizers did
their part by encouraging diversity in their code of conduct, reinforced by a 
public reminder to be respectful to not just women, but all attendees. On my 
vacation to Rio after the conference, I saw many anti-homophobia campaigns 
throughout the city, so it seems that, as in the United States, there's a big
effort to improve on issues of gender and sexuality.

When Sebastian was introduced to speak, there was thunderous applause, maybe
even more than that for Brendan Eich. It was at this time that I learned
he was the creator of Babel (which he pronounces "babble", not "bay-bel" like
the tower). I knew from our dinner conversation that he worked at Facebook, but
had no idea what he did there, and was surprised with how young he is to
have done such an amazing project. Despite his brilliance, he still was 
nervous to be on stage. The talk was excellent.

Ryan Salva couldn't make it, so there was a Q&A for a panel of developers from
Microsoft to discuss the new Edge browser. I found this very interesting, as
Christian Heilmann discussed things like the difficulty moving Microsoft
software to open source and how priorities for the project were being set.
Fernando Miçalli then gave a very educational recount of how, over many years,
the news website he worked on evolved to provide real-time information about
football games and elections using different technologies.

Jonathan Sampson was next. He wowed the audience by being a "gringo" that
spoke Portuguese, but his talk was also really good, as he showcased the new
ES6 language features and how they translated to ES5 (using the TypeScript 
transpiler since he is a Microsoft guy).

Julián Duque brought the cool after this by demonstrating many NodeBots
(devices programmed using node.js) he had built. These ranged from LED strip
displays & worn accessories to a drone flown through the audience. You could
really see the love he has for programming.

Brendan Eich's talk was entertaining, as he poked fun at quirks of the language
and showed content from [wtfjs](http://wtfjs.com/). But it was also enlightening to learn more of
the history of why things are the way they are. He also was really excited (as
am I) about WebAssembly and what it can mean for the future of JavaScript.

After the talks were done, the floor was cleared, and a really great cover
band came on stage (Crime Scene), bringing us 90's favorites. Unlimited 
German-style craft beer from Porto Alegre flowed from the taps, and a good 
time was had by all. I couldn't help but go out onto the floor and "mosh" with
fellow geeks to the sweet refrains of Rage Against the Machine and Nirvana, 
sweating like a fool.

But the mini concert wasn't the best thing of the evening. Last year, I got to
acquaint myself with many great developers during and after the conference,
and have some drinks and good conversation. Some of these guys I saw again this
year, though sadly I didn't find all of them. In 2015, I once again had the
immense pleasure of geeking out with fellow dev brethren from Brazil. 
Eventually, my adrenaline wore off and my lack of sleep caught up with me, so 
I sadly didn't get to stay out late this time.

## Best Tech Conference!

BrazilJS 2014 was the best tech conference I'd ever attended, and now it's only
been topped by BrazilJS 2015. The organizers should be commended for finding
top-quality presenters and keeping things consistently lively and entertaining
throughout. They do a great job making sure the speakers are helped through the
complications of language barriers, transportation, lodging, and meals; I 
definitely felt taken care of and comfortable through the proceedings.

But I think the main reason BrazilJS is my favorite conference is the vibe.
The conference has a different emotional atmosphere than what I usually 
encounter at these things, one that is joyous. Everyone seems to be genuinely 
excited to be there and express a real love of their craft, which is what we 
should all feel programming in perhaps the best time to be a coder.

I know that I don't exactly fit in as a speaker at a major tech conference like
BrazilJS, but I'm really grateful for the circumstances which enabled me to be
there and for the warm reception given to me by the organizers, the rock stars,
and the attendees. Obrigado!

