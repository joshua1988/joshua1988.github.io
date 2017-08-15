---
layout: archive
permalink: /
---

<div class="tiles">
{% for post in site.categories.web_dev %}
	{% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->
