---
permalink: amp/
layout: archive
title: "Accelerated Mobile Page"
---
<div class="tiles">
{% unless category contains "web_dev" %}
{% for post in site.categories.amp %}
	{% include post-grid.html %}
{% endfor %}
{% endunless %}
</div>
