---
title: "10 Print Box"
date: 2017-04-08
tags: [10 Print, art, electronics, arduino, 3d printing]
header:
  teaser: "/img/teasers/10print.jpg"
excerpt: "A single-purpose device that generates the \"10 Print\" pattern on any TV."
---
{% include video id="Z7ymfy0DB0M" provider="youtube" %}

## Concept

Recently, [Noopkat](https://twitter.com/noopkat) appeared as a guest on [The Coding Train](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw). The subject of the stream was generative art running on hardware, which was something I hadn't considered experimenting with previously. Specifically, the stream focussed on getting the [10 Print](https://10print.org/) algorithm running on an LCD screen attached to an Arduino.

I was reminded of the [TVOut](https://github.com/Avamander/arduino-tvout) library for Arduino, which I'd played with before, so I thought I'd combine it with the ideas in the stream and create a new generative toy.

<img src="{{ site.url }}{{ site.baseurl }}/img/10print1.jpg" alt="10 Print Box">

## Hardware

I wanted to make a small device, so I picked up a spare Arduino Nano, a potentiometer for adjusting the random threshold, an RCA jack for video output and a couple of resistors which form a small DAC network for generating the video signal.

I knocked up a case in Fusion 360 to hold all of the components, which wraps it up into a neat little package.

<img src="{{ site.url }}{{ site.baseurl }}/img/10print2.jpg" alt="10 Print Box">

<img src="{{ site.url }}{{ site.baseurl }}/img/10print3.jpg" alt="10 Print Box">

## Code

The essence of the `10 Print` algorithm is randomly generating forward-leaning and backward-leaning diagonal lines in a grid pattern. Adjusting the threshold that decided which way the next line points can lead to some interesting results, so the code performs an `analogRead` of the potentiometer and uses this as the threshold.

The [TVOut](https://github.com/Avamander/arduino-tvout) library does the heavy lifting of the drawing to screen, so the code ended up being pretty simple. It's on [GitHub](https://github.com/walkerdanny/10PrintBox) for remixing or recreating.
