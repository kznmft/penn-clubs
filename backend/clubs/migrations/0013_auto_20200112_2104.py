# Generated by Django 3.0.2 on 2020-01-12 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("clubs", "0012_testimonial")]

    operations = [
        migrations.CreateModel(
            name="Year",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("name", models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name="club",
            name="target_years",
            field=models.ManyToManyField(blank=True, to="clubs.Year"),
        ),
    ]