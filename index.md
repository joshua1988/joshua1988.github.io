---
layout: archive
permalink: /
---
<!-- pagination related link https://learn.cloudcannon.com/jekyll/looping-in-liquid/ -->
<!-- limit: 30 -->
<div class="tiles">
{% for post in site.categories.life %}
	{% include post-grid.html %}
{% endfor %}
{% for post in site.categories.web-development %}
	{% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->
