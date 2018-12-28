---
layout: default
---
# APIs

{% assign items_grouped = site.APIs | group_by: 'alpha' %}
{% for group in items_grouped %}
### {{group.name}}
    {% for item in group.items %}* {{ value.slug }} - [{{ value.name }}]({{ value.slug | uri_escape | replace: ":","%3A" }}.html)
    {% endfor %}
{% endfor %}

