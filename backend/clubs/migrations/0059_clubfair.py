# Generated by Django 3.1.3 on 2020-12-04 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("clubs", "0058_badge_visible"),
    ]

    operations = [
        migrations.CreateModel(
            name="ClubFair",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("name", models.TextField()),
                ("organization", models.TextField()),
                ("contact", models.TextField()),
                ("time", models.TextField()),
                ("information", models.TextField()),
                ("start_time", models.DateTimeField()),
                ("end_time", models.DateTimeField()),
            ],
        ),
    ]
