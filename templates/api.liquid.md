# {{ info.title }}

* Version: `{{ info.version }}`
{% if info.contact %}
{% if info.contact.email %}
* Contact: 📧 [{{ info.contact.name }}](mailto:{{ info.contact.email }})
{% endif %}
{% if info.contact.url %}
* Contact: 🌐 [{{ info.contact.url }}]({{ info.contact.url }})
{% endif %}
{% endif %}
{% if info.termsOfService %}
* ToS: [{{ info.termsOfService}}]({{ info.termsOfService }})
{% endif %}

{% if description %}
## {{ description }}
{% endif %}

* [Download from APIs.guru](https://raw.githubusercontent.com/APIs-guru/asyncapi-directory/master/docs/APIs/{{ slug | url_encode }}.yaml)
* [Download original]({{ origin }})

<script type="application/ld+json">
{
  "@context": "http://schema.org/",
  "@type": "WebAPI",
{% if description %}  "description": "{{ description }}",{% endif %}
{% if externalDocs %}  "documentation": "{{ externalDocs.url }}",{% endif %}
{% if info.termsOfService %}  "termsOfService": "{{ info.termsOfService }}",{% endif %}
  "name": "{{ info.title }}"
}
</script>
