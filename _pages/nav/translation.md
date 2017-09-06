---
permalink: translation/
layout: archive
title: "Translation"
---
<div class="tiles">
{% unless site.categories contains "web_dev" %}
{% for post in site.categories.translation %}
	{% include post-grid.html %}
{% endfor %}
{% endunless %}
</div>
