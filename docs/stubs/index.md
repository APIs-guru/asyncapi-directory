---
layout: default
---
# APIs

{% assign items_grouped = site.APIs | where: 'stub', true | group_by: 'alpha' %}
{% for group in items_grouped %}
### {{group.name}}
{% for item in group.items | where: "stub", true %}* {{ item.slug }} - [{{ item.name }}]({{ item.url | replace: 'APIs/', 'asyncapi-directory/APIs/' }})
{% endfor %}
{% endfor %}

