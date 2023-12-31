from application import db
import random, string
from flask import jsonify

from application.models.Attendees import Attendee
from application.models.User import User
from application.models.Errors import EventNotFound, ActionNotAllowed

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    postcode = db.Column(db.String(9), nullable=False)
    share_code = db.Column(db.String(250), nullable=True)
    date = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(250), nullable=True)
    title = db.Column(db.String(30), nullable=False)
    

    
    def __init__(self, creator_id, postcode, share_code, date, description, title):
        self.creator_id = creator_id
        self.postcode = postcode
        self.share_code = share_code
        self.date = date
        self.description = description
        self.title = title
        db.create_all()
    
    def __repr__(self):
        return (f"User {self.creator_id} created the event")
    
    
    def get_event_by_id(id):
        try:
            event =  db.session.execute(db.select(Event).filter_by(id=id)).scalar_one()
            return event
        except:
            db.session.rollback()
            raise ActionNotAllowed
    
    def create_event(user_id, data):
        try:
            share_code = Event.create_code(10)
            event = Event(user_id, data['postcode'], share_code, data['date'], data['description'], data['title'])
            db.session.add(event)
            db.session.commit()
            event_new = Event.get_event_by_id(event.id)
            
            attendee = Attendee.create_attendee(event.id, user_id)
        
            return event_new
        except:
            db.session.rollback()
            raise ActionNotAllowed
    
    def create_code(length):
        code = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(length))
        return code   
    
    def get_one_by_share(share_code):
        try: 
            event = db.session.execute(db.select(Event).filter_by(share_code=share_code)).scalar_one()
            event_new = Event.get_event_by_id(event.id)
            return event_new
        except: 
            db.session.rollback()
            raise EventNotFound
    
    def fetch_all(user_id):
        try:
            response = Event.query\
                .join(Attendee, Attendee.event_id == Event.id)\
                .filter(Attendee.user_id == user_id)\
                .all()

            return response
        except:
            db.session.rollback()
            raise ActionNotAllowed
    
    def fetch_attendees(event_id):
        try:
            check_event_exist = Event.query.filter_by(id=event_id).first()
            if not check_event_exist:
                raise ActionNotAllowed
            
            response = db.session.query(Attendee, User.user_name)\
                .join(User, User.id==Attendee.user_id)\
                .filter(Attendee.event_id == event_id)\
                .all()
            #response = Attendee.query\
            return response
        except:
            db.session.rollback()
            raise ActionNotAllowed