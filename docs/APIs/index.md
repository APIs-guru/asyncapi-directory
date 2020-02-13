---
layout: default
---
# APIs

{% assign items_grouped = site.APIs | group_by: 'alpha' %}
{% for group in items_grouped %}
### {{group.name}}
{% for item in group.items %}* {{ item.slug }} - [{{ item.name }}]({{ item.url | replace 'APIs/', 'asyncapi-directory/APIs/' }})
{% endfor %}
{% endfor %}

