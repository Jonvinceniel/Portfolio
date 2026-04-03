from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Profile, Skill, Project, Education, ContactMessage


def get_profile():
    return Profile.objects.first()


def home(request):
    profile = get_profile()
    featured_projects = Project.objects.filter(featured=True)[:3]
    context = {
        'profile': profile,
        'featured_projects': featured_projects,
        'active': 'home',
    }
    return render(request, 'portfolio/home.html', context)


def about(request):
    profile = get_profile()
    context = {
        'profile': profile,
        'active': 'about',
    }
    return render(request, 'portfolio/about.html', context)


def skills(request):
    profile = get_profile()
    all_skills = Skill.objects.all()
    skill_categories = {}
    for skill in all_skills:
        cat_label = skill.get_category_display()
        if cat_label not in skill_categories:
            skill_categories[cat_label] = []
        skill_categories[cat_label].append(skill)
    context = {
        'profile': profile,
        'skill_categories': skill_categories,
        'active': 'skills',
    }
    return render(request, 'portfolio/skills.html', context)


def projects(request):
    profile = get_profile()
    all_projects = Project.objects.all()
    context = {
        'profile': profile,
        'projects': all_projects,
        'active': 'projects',
    }
    return render(request, 'portfolio/projects.html', context)


def education(request):
    profile = get_profile()
    educations = Education.objects.all()
    context = {
        'profile': profile,
        'educations': educations,
        'active': 'education',
    }
    return render(request, 'portfolio/education.html', context)


def contact(request):
    profile = get_profile()
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        subject = request.POST.get('subject', '').strip()
        message = request.POST.get('message', '').strip()

        if name and email and subject and message:
            ContactMessage.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message,
            )
            messages.success(request, 'Your message has been sent successfully!')
            return redirect('contact')
        else:
            messages.error(request, 'Please fill in all fields.')

    context = {
        'profile': profile,
        'active': 'contact',
    }
    return render(request, 'portfolio/contact.html', context)
