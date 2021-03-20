---
title: Browse the stub APIs
layout: md
css: ../assets/css/architect.min.css
---
# APIs

{% assign apis = collections.api | sorted %}
{% for item in api %}
{% if item.data.stub == true %}* {{ item.data.slug }} - [{{ item.data.name }}]({{ item.data.page.url | prepend: "../" | append: "index.html" }}){% endif %}
{% endfor %}

