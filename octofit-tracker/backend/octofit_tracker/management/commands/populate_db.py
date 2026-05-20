from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Clearing existing data...')
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()

        self.stdout.write('Creating users...')
        users = [
            User(username='ironman', email='ironman@avengers.com', password='stark123'),
            User(username='thor', email='thor@avengers.com', password='mjolnir123'),
            User(username='batman', email='batman@dc.com', password='batcave123'),
            User(username='superman', email='superman@dc.com', password='krypton123'),
            User(username='blackwidow', email='blackwidow@avengers.com', password='natasha123'),
            User(username='spiderman', email='spiderman@avengers.com', password='webslinger123'),
        ]
        for user in users:
            user.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(users)} users'))

        self.stdout.write('Creating teams...')
        team_marvel = Team(
            name='Team Marvel',
            members=['ironman', 'thor', 'blackwidow', 'spiderman']
        )
        team_marvel.save()

        team_dc = Team(
            name='Team DC',
            members=['batman', 'superman']
        )
        team_dc.save()
        self.stdout.write(self.style.SUCCESS('Created 2 teams'))

        self.stdout.write('Creating activities...')
        activities = [
            Activity(user='ironman', activity_type='running', duration=30.0, date=date(2024, 1, 15)),
            Activity(user='thor', activity_type='strength training', duration=45.0, date=date(2024, 1, 15)),
            Activity(user='batman', activity_type='running', duration=60.0, date=date(2024, 1, 16)),
            Activity(user='superman', activity_type='flying', duration=20.0, date=date(2024, 1, 16)),
            Activity(user='blackwidow', activity_type='martial arts', duration=50.0, date=date(2024, 1, 17)),
            Activity(user='spiderman', activity_type='web-slinging', duration=35.0, date=date(2024, 1, 17)),
        ]
        for activity in activities:
            activity.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(activities)} activities'))

        self.stdout.write('Creating leaderboard...')
        leaderboard_entries = [
            Leaderboard(user='ironman', score=850),
            Leaderboard(user='thor', score=920),
            Leaderboard(user='batman', score=780),
            Leaderboard(user='superman', score=960),
            Leaderboard(user='blackwidow', score=830),
            Leaderboard(user='spiderman', score=870),
        ]
        for entry in leaderboard_entries:
            entry.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(leaderboard_entries)} leaderboard entries'))

        self.stdout.write('Creating workouts...')
        workouts = [
            Workout(name='Avengers Cardio Blast', description='High-intensity cardio workout inspired by Iron Man', duration=30),
            Workout(name='Thor Thunder Strength', description='Full-body strength training like the God of Thunder', duration=45),
            Workout(name='Batman Stealth Training', description='Agility and stealth training routine from the Dark Knight', duration=60),
            Workout(name='Superman Power Endurance', description='Super-powered endurance training', duration=40),
            Workout(name='Black Widow Combat Fitness', description='Martial arts and combat fitness routine', duration=50),
            Workout(name='Spider-Man Flexibility', description='Flexibility and acrobatics workout', duration=35),
        ]
        for workout in workouts:
            workout.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts)} workouts'))

        self.stdout.write(self.style.SUCCESS('Successfully populated octofit_db database with test data'))
