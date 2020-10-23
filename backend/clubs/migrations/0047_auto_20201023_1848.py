# Generated by Django 3.1.2 on 2020-10-23 22:48

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("clubs", "0046_auto_20201017_1149"),
    ]

    operations = [
        migrations.CreateModel(
            name="StudentType",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("name", models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name="club", name="appointment_needed", field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="club", name="available_virtually", field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="club", name="signature_events", field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name="historicalclub",
            name="appointment_needed",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="historicalclub",
            name="available_virtually",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="historicalclub",
            name="signature_events",
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name="profile", name="uuid_secret", field=models.UUIDField(default=uuid.uuid4),
        ),
        migrations.AddField(
            model_name="club",
            name="student_types",
            field=models.ManyToManyField(blank=True, to="clubs.StudentType"),
        ),
    ]
