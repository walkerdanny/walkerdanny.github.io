---
title: "Terrain Model Generator"
date: 2017-03-30
tags: [3d printing, art, Python]
header:
  teaser: "/img/teasers/terrain.jpg"
excerpt: "A tool for generating 3D prints of land relief"
---
## Concept

When on Google Earth, I thought that having a physical representation of the 3D terrain view would be neat. With a little investigation, I found that Google actually make their data on the elevation for specific GPS coordinates available via the [Google Maps API](https://developers.google.com/maps/documentation/elevation/intro).

This led to the creation of a tool that takes two GPS coordinates as inputs, and produces a 3D printable model of the area enclosed in the resultant rectangle.

<img src="{{ site.url }}{{ site.baseurl }}/img/terrain1.jpg" alt="Terrain Generator">

## How it Works

The core of the tool is a Python script, with a HTML/JS front end.

<img src="{{ site.url }}{{ site.baseurl }}/img/terrainUI.png" alt="Terrain Generator UI">

The front end has an embedded map, which the user draws a rectangle on, enclosing the area they want a model of. Some optional parameters are available which perform some transformations on the data so that the model is a reasonable shape. The GPS coordinates of the bounding rectangle, along with the other parameters, are then sent over a WebSocket connection to the Python script.

The Google Maps API returns the elevation for a specific GPS point, and can return several values per request. The Python script divides the bounding rectangle into a grid of points, and then further subdivides this grid into "strips", running longitudinally. The elevation of each point in the strip is then requested from the API, and the strips are then appended to each other to form the whole grid. This is done in order to avoid requesting too many points at once.

The script then transforms the data to suit the scale of the 3D print, translating and scaling as necessary. A triangular mesh is then computed between each point on the grid, giving the terrain surface. Once this is finished, the sides and bottom surface of the object are computed.

The script then exports this triangular mesh as a `.stl` file, ready for 3D printing. For this, I wrote a custom `.stl` generator, to suit the data format that I was using. While daunting, this was relatively easy as the `.stl` file format is simple and well-documented.

The code works for any scale, from entire countries to small areas of a town. For example, below are images of models of Lisbon and the entirety of Malta. Good results can be obtained when generating models of mountains and canyons, and Google Maps can even return estimated values for the depth of the sea bed. This can be seen in the Malta model, which maps the sea surrounding the land masses as well as the land.

<img src="{{ site.url }}{{ site.baseurl }}/img/terrain2.png" alt="Model of Lisbon">

<img src="{{ site.url }}{{ site.baseurl }}/img/terrain3.png" alt="Model of Malta">
