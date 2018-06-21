---
title: "Pendulum Bowl Generator"
date: 2018-02-20
tags: [3d printing, art, generative]
header:
  teaser: "/img/teasers/pendulum.jpg"
excerpt: "Simulating spherical pendulums to create 3D printable bowls."
---
<img src="{{ site.url }}{{ site.baseurl }}/img/pendulum1.jpg" alt="Pendulum Bowl">

## The Idea

Recently, I've been playing around with combining generative data with 3D printing using Python and OpenSCAD. One project I'm doing this for is working with image processing to generate 3D models from 2D photos. I hit kind of a rut with it though, and wanted a quick little project that would generate some cool results quickly.

Watching [The Coding Train](https://www.youtube.com/watch?v=uWzPe_S-RVE), where [Daniel Shiffman](https://www.twitter.com/shiffman) live codes solutions to some cool computer science problems, I got to thinking that a spherical pendulum would be an interesting way of generating a 3D dataset, and the results would look something like a bowl.

I figured I could probably implement this quite easily, especially since I have experience of simulating oscillating systems from my degree, so I gave it a shot and it turned out to be pretty simple!

<img src="{{ site.url }}{{ site.baseurl }}/img/pendulum3.jpg" alt="Pendulum Bowl">

## The Solution

I wrote a Python script that implements the equations of motion of a spherical pendulum. It makes some simplifications, since spherical pendulums are numerically unstable at small angles. The effect of these assumptions are minimal though, and the accuracy of the simulation isn't all that important.

The solutions to the equations of motion are iterated for a number of time steps, resulting in an array of 3D coordinates which represent the path that the bob of the pendulum took. The script then generates an OpenSCAD file which draws a sphere at each of these coordinates, and performs a `hull()` command between them. The size of the sphere can be proportional to the velocity of the pendulum, which makes for a neat additional effect.

The resultant OpenSCAD file is then opened, rendered and an STL file is generated for 3D printing.

## Results

<img src="{{ site.url }}{{ site.baseurl }}/img/pendulum2.jpeg" alt="Pendulum Bowl">

Some examples of objects the script has generated can be seen on this page, and the STL files are on my [GitHub](https://github.com/walkerdanny/Pendulum_Bowl).
Some nice effects can be achieved when printing in gradient filament!
I also turned this into a [Twitter bot](https://twitter.com/PendulumBot), which tweets a randomised "bowl" once per day! More info [here](/twitter-bots/).
