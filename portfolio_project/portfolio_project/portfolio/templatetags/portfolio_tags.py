from django import template

register = template.Library()


@register.filter
def split_name_first(value):
    """Return the first word of the name."""
    parts = value.split()
    if len(parts) > 1:
        return ' '.join(parts[:-1])
    return value


@register.filter
def split_name_last(value):
    """Return the last word of the name."""
    parts = value.split()
    if len(parts) > 1:
        return parts[-1]
    return ''


@register.filter
def split_br(value):
    """Split a string by <br> tag and return a list."""
    import re
    parts = re.split(r'<br\s*/?>', str(value))
    return [p.strip() for p in parts if p.strip()]
