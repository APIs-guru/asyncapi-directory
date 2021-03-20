---
css: ../assets/css/architect.min.css
title: Browse the APIs
layout: md
#permalink: APIs
---
# APIs

{% assign apis = collections.api | sorted %}
{% for item in apis %}
{% if item.data.stub != true %}* {{ item.data.slug }} - [{{ item.data.name }}]({{= item.data.page.url | prepend: "../" | append: "index.html" }}){% endif %}
{% endfor %}

