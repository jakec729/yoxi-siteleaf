---
order: 4
title: Explore our point of view or join our conversations
section_id: explore-yoxi
classes:
  header: is-offset-2-md is-9-md
  square: right small
  heading: 
  content: is-offset-2-md is-9-md has-padding-bottom
parent: home
links:
  - name: facebook
    url: #
  - name: twitter
    url: #
  - name: medium
    url: #
  - name: maptia
    url: #
---


<ul class="is-unstyled has-padding-top-medium is-marginless">
	{% for link in page.links %}
		<li><a href="link.url" class="btn btn-outline"><i class="fa fa-fw fa-{{link.name|downcase}}"></i>&nbsp;{{link.name | capitalize}}</a></li>
	{% endfor %}
</ul>
