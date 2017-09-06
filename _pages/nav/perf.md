---
permalink: perf/
layout: archive
title: "Application Performance"
---
<div class="tiles">
{% unless site.categories contains "web_dev" %}
{% for post in site.categories.perf %}
	{% include post-grid.html %}
{% endfor %}
{% endunless %}
</div>
