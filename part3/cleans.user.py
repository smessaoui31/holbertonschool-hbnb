from app import create_app, db
from app.models.user import User  # adapte le chemin si besoin

app = create_app("development")

with app.app_context():
    # Récupère tous les utilisateurs triés par date de création
    users = User.query.order_by(User.created_at.asc()).all()

    if len(users) > 10:
        users_to_delete = users[10:]  # à partir du 11e

        for user in users_to_delete:
            db.session.delete(user)

        db.session.commit()
        print(f"{len(users_to_delete)} utilisateurs supprimés. Il en reste 10.")
    else:
        print("Il y a 10 utilisateurs ou moins. Rien à supprimer.")