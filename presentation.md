# Introduction

Hello, fellow developers! I am Jacob Page, a software engineer at GoDaddy. I am part of the team that works on the
WebsiteBuilder product, which is an application that non-technical users can use to create their own websites.

Throughout GoDaddy, we're more-and-more turning into a JavaScript shop as we adopt node.js on our back-end, and of
course JavaScript is king of the front end. So I'm super excited to be at this conference where we can all geek-out
on this funny little language.


# Topic disclaimer

So the topic I'm speaking on is "Functional Reactive Programming." If you haven't heard this term before, it may sound
pretty heavy. Especially the F word part. Usually when people start slinging around the term "functional," you'll end
up having to sit through someone trying to explain monads, lambda calculus, and higher-order types. I'm not a math
guy, or even a computer science guy, so I'm not going to sling around a lot of ph.D terminology today. I want to talk
about FRP from my perspective as a JavaScript coder.

FRP is not going to unlock magic powers in your software. It will not eliminate all your bugs. It will not melt your
CPUs with blazing speed, run off 500 bytes of memory, or make money fly out of customer's pockets into yours. It's just
a style of programming. You'll still be write all those bugs that keep us gainfully employed, no matter what
technologies are on your toolbelt.

So why am I even speaking on this topic? What's the point?

Technology paradigms, including this one, are a dime a dozen. Despite us thinking we're an industry of logical,
rational thinking people, we're completely driven by hype, flitting from one new-fangled methodology or tech stack to
another. I'm old enough to remember when OOP was in its hype phase. "Model your problem with objects, and they'll
naturally map to real-world requirements, meaning less bugs." Yeah, that wasn't true. "Use XML for all the things and
interoperability will be a piece of cake." Yeah right. Or my current favorite, "split up your monoliths into hundreds
of microservices and say goodbye to maintenance nightmares." Wait, how is this different from SOA a decade ago?

The reason I'm bringing all of this up is because there's hype around FRP as well, and I want to distance this talk
from that. I'm not going to try to overpromise.

So why should you be interested in FRP? Because it will help you write more "elegant" code.


# What makes code "elegant"

What the hell do I mean by "elegant?" Elegance is a subjective, overloaded term. What place does it have in a
technology discussion? I opine that it matters a ton. To illustrate, let's look at some code.

Our requirement is to display a contact list. Given a list of all sales reps, show the top 10 matching reps that are
currently available based on office hours, sorted by how close their office is to a given location, then randomly.

Here's how you might think about the problem: "I need to build an array of reps. Start with an empty array. Loop through
the reps. If a rep is not currently available, go to the next one. Calculate the distance to the given location.
Store the rep with that distance in the array along with a random number. When finished looping, sort the array by
distance & the random number. Then create a new array. Loop 10 times, and put the rep's contact information at the
loop index into that array. Return the new array.

```javascript
function getSalesContacts(allReps, max, location) {
  var available = [], rep;
  for (var i = 0; i < allReps.length; i++) {
    rep = allReps[i];
    if (!rep.isAvailable()) {
      continue;
    }
    available.push({
      rep: rep,
      dist: getDistance(location, rep.location),
      rand: Math.random()
    });
  }
  available.sort(function (a, b) {
    return (a.dist - b.dist) || (a.rand - b.rand);
  });
  var results = [];
  for (i = 0; i < max; i++) {
    rep = available[i].rep;
    results.push({
      name: rep.name,
      phone: rep.phone,
      email: rep.email,
      location: rep.location,
      hours: rep.hours
    });
  }
}
```

Relatively straightforward, no? But if you're having to read the code or change it, would you rather be looking at that,
or would you rather be looking at this?

```javascript
function getSalesContacts(allReps, max, location) {
  return allReps
    .filter(rep => rep.isAvailable())
    .map(rep => {
      rep: rep,
      dist: getDistance(location, rep.location),
      rand: Math.random()
    })
    .sort((a, b) => (a.dist - b.dist) || (a.rand - b.rand))
    .slice(0, max)
    .map(d => {
      rep = d.rep;
      return {
        name: rep.name,
        phone: rep.phone,
        email: rep.email,
        location: rep.location,
        hours: rep.hours
      }
    });
}
```

Of course, beauty is in the eye of the beholder, but I think most devs would agree they prefer the second. But why is
that? 

Is it because it _performs_ better? Well, no. In fact it's going to be a bit less performant. Not substantially
so, but a real performance nut would not choose this if that was the only criterium. 

Is it because the code is shorter? Partially! It did go from 26 lines to 19, but is that really what makes all the
difference?

Is it because it's _functional_? Maybe. Us programmers are _opinionated_ SOBs and can be dogmatic, and sometimes
"it's functional" is enough to sway die-hard fans. But the purists in the audience are probably cringing right now;
it's not purely functional, they'd point out. That `.sort` function _mutates_ the array. And that random number
generator breaks referential transparency. Oh well, fuck purists.

I think the _real_ reason we'd rather look at the second set of code is because it's more _elegant_, and that makes it
easier to understand.

1. It is concise.
1. It describes the problem as a series of _transformations_, reducing the number of concepts being used.
1. Because the calls are sequential, there's only one code path to follow.
1. Well-understood concepts, like `map`, `filter`, `sort`, and `slice` are used; parsing a loop takes more time to reason about the code.


# Evolution of DHTML

Let's change gears a little bit and talk about the evolution of DHTML (or at least that's what we _used_ to call it).
Remember when we used to make our HTML dynamic like this?

```html
<a onclick="runSomeFunction(event);" href="#">Click here</a>
<script type="text/javascript">
  function runSomeFunction(e) {
    e.preventDefault();
    var div = document.getElementById('some-div');
    div.style.display = 'block';
    var content = document.createElement('span');
    var text = document.createTextNode('Hi there!');
    content.appendChild(text);
    div.appendChild(content);
    var theLink = e.target || e.srcElement;
    theLink.style.display = 'none';
    return false;
  }
</script>
```

Sorry if I'm giving any of you PTSD right now. And I apologize if some of you are _still_ writing code this way. 

What exactly was _wrong_ with this type of code?

First, the obvious. In order to accommodate a variety of browsers with different degrees of standardization, we had to
do such nasty workarounds like feature detection or duplicating functionality for different platforms. The second
obvious problem is the DOM API; it's just so verbose and hard to use. The third issue is the nasty inline event
handlers; you have to look in two places to understand what's going on, the HTML and the JavaScript.

Many libraries arose to work around the ugly. It wasn't the first by any means, but jQuery is one very popular library
that addressed many problems:

```javascript
$('#the-link')
  .on('click', function (e) {
    $(this).hide();
    $('#some-div')
      .append('<span>Hi there!</span>')
      .show();
    e.preventDefault();
  });
```

Certainly an improvement. It abstracts DOM manipulations so that browser differences can be ignored. It also normalizes
AJAX requests and other browser interfaces. With the adoption of jQuery, it also became more normal to attach event
handlers instead of specifying them inline.

However, there is another problem with both this and the original code we haven't talked about. Imagine snippets like
the above, only hundreds of them, scattered throughout multiple files. Unfortunately, for a single-page application of
any usefulness, that's what would be required. Now, imagine trying to debug an issue. Sure, you may very carefully
lay out your code in a logical fashion to make this easier, but one thing is certain: each event handler has full
access to the entire DOM. This makes _reasoning_ about the application difficult. Widgets help a bit, but it becomes
clear when building a large application that jQuery is not an application framework, it's just a DOM library.

So for applications, we saw a plethora of MVC platforms contending to be king. In this I include Ember, Angular, and
the like. Many of these use so-called two-way data binding. In data binding, you tie a Model to the View through a set
of declarations, and the View automatically updates when the Model changes. With two-way binding, the reverse is also
true; changes made within the View update the Model. Here's some Knockout code, for example:

```html
<form data-bind="with: customer">
  <label>First Name</label> <input data-bind="value: firstName">
  <label>Last Name</label>  <input data-bind="value: lastName">
  <input type="submit" value="Lookup" data-bind="click: lookup">
</form>
```

What an improvement! To understand the application, you no longer have to look in the HTML and JavaScript separately
to understand how your data relates to your HTML. And in a seemingly magical way, it "just works."

But again, there's a catch! Getting this magic to work has its cost:

1. Because we don't yet have `Object.observe()`, having your View respond to changes in your Model requires you to wrap the model in something that is observable (as with Knockout), or do diffs on the data (as with Angular). 
2. If the model is tied directly to the DOM, model updates can cause poor performance as each change could have costly repercussions. This can be very hard to predict. Angular worked around this by having a render loop where updates are only checked after running event handling code. But this made dealing with _other_ code, like Ajax response handlers, awkward.
3. Data binding declarations could grow very verbose, and because it's usually not _real_ JavaScript, the binding language itself becomes something new to learn.
4. Models (view models) could end up having high amounts of complexity as well, so to truly understand your code, you must still view JavaScript and your markup in separate contexts.

So where are we now? For the last few years, one of the "hottest" technologies has been React. 


## The procedural paradigm

## The data binding paradigm

## The one-way data flow paradigm (like React)

### What makes one-way data flows "elegant"

### How React by itself isn't sufficient for complex applications

### Flux

### How React & Flux don't go far enough

# What is isomorphism?

## Example A: String & Number (monoids)

## Example B: Asynchronous patterns

## Example C: Sequences

# What is FRP?

## Technical definition

## Simplified definition

## Unifying of isomorphic concepts into one data type

### Sequences (map, filter, reduce)

### Control flow

### Scheduling

# How this fits into Flux

# Demo of a FRP application

# Libraries

## Rx, Bacon

# Isometric FRP

## HTTP requests

## Logs

## Message queues

## Kafka

