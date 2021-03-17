---
title: Browse the stub APIs
layout: md
css: ../assets/css/architect.min.css
---
# APIs

{% for item in collections.api %}
{% if item.data.stub == true %}* {{ item.data.slug }} - [{{ item.data.name }}]({{ item.data.page.url | prepend: "../" | append: "index.html" }}){% endif %}
{% endfor %}

