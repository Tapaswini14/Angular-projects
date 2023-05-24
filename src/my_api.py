from flask import Flask, request, jsonify

from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)



class Restaurant:
    def __init__(self, id, name, address, phone_number, email_id, cuisine_type ):
        self.id = id
        self.name = name
        self.address = address
        self.phone_number = phone_number
        self.email_id = email_id
        self.cuisine_type = cuisine_type

    def get_all_attributes(this):

        return {
            'id' : this.id,
            'name' : this.name,
            'address' : this.address,
            'phone_number' : this.phone_number,
            'email_id' : this.email_id,
            'cuisine_type' : this.cuisine_type,
        }
    



restaurant_list = [

    Restaurant(id=1, name="Starlit", address="rabi talkies", phone_number=25436755789, email_id="starlit5@gmail.com", cuisine_type="russian"),
    Restaurant(id=2, name="CCD", address="saheed nagar", phone_number=436748759, email_id="cafecoffeee@gmail.com", cuisine_type="coffee"),
    Restaurant(id=3, name="BBQ", address="patia", phone_number=54654656, email_id="bbq3@gmail.com", cuisine_type="chicken"),
    Restaurant(id=4, name="Civilians", address="vani vihar", phone_number=34343567468, email_id="civilians5@gmail.com", cuisine_type="naan,curry"),
    Restaurant(id=5, name="Curry Kingdom", address="delhi", phone_number=64533674847, email_id="curryking6@gmail.com", cuisine_type="russian"),
    Restaurant(id=6, name="The Naan House", address="mumbai", phone_number=56467478, email_id="thenaanhouse7@gmail.com", cuisine_type="chinese"),
    Restaurant(id=7, name="Curry in a Hurry", address="bangalore", phone_number=6757857959, email_id="curryinhurry@gmail.com", cuisine_type="coffee"),
    Restaurant(id=8, name="Mumbai in Minutes", address="chennai", phone_number=748747959, email_id="mumbaicafe@gmail.com", cuisine_type="snacks"),
    Restaurant(id=9, name="Spice is Nice", address="patia", phone_number=4875589589, email_id="spiceisnice@gmail.com", cuisine_type="cafe"),
    Restaurant(id=10, name="Rikki Tikki Take-Out", address="infocity", phone_number=567578607, email_id="take-out@gmail.com", cuisine_type="pizza"),
    Restaurant(id=11, name="Chais and Thais", address="chennai", phone_number=657589606068, email_id="chaisandthais@gmail.com", cuisine_type="chinese"),
    Restaurant(id=12, name="Killer Kabobs", address="delhi", phone_number=32455646766, email_id="killer@gmail.com", cuisine_type="thai"),
    Restaurant(id=13, name="Mumbai Tummy", address="hyderabad", phone_number=325433535, email_id="mumtum@gmail.com", cuisine_type="korean"),
    Restaurant(id=14, name="Yummy Tummy", address="kochi", phone_number=64357478, email_id="yummy76@gmail.com", cuisine_type="chinese"),
]

@app.route('/api/restaurant/add', methods=['POST'])
@cross_origin(supports_credentials=True)

def add_restaurant():
    print(list(request.form.items()))
    id = request.form.get('id')
    name = request.form.get('name')
    address = request.form.get('address')
    phone_number = request.form.get('phone_number')
    email_id = request.form.get('email_id')
    cuisine_type = request.form.get('cuisine_type')

    # Validate input data
    if not all([name, address, phone_number, cuisine_type, email_id, id]):
        return jsonify({'success': False, 'message': 'Missing required fields' })

    # Insert new record into database
    # (Assuming you have a Restaurant model with the appropriate fields)
    restaurant_list.append(Restaurant(id=id, name=name, address=address, phone_number=phone_number, email_id=email_id, cuisine_type=cuisine_type))
    
    # Return success response
    return jsonify({
        'success': True,
        'message': 'Restaurant added successfully', 
        })


@app.route('/api/restaurant/update', methods=['POST'])
@cross_origin(supports_credentials=True)

def update_restaurant():
    print(list(request.form.items()))
    id = request.form.get('id')
    name = request.form.get('name')
    address = request.form.get('address')
    phone_number = request.form.get('phone_number')
    email_id = request.form.get('email_id')
    cuisine_type = request.form.get('cuisine_type')

    # Validate input data
    if not all([name, address, phone_number, cuisine_type, email_id, id]):
        return jsonify({'success': False, 'message': 'Missing required fields' })

    for i, restaurant in enumerate(restaurant_list):
        print(restaurant.id, id)
        if str(restaurant.id) == str(id):
            restaurant_list[i] = Restaurant(id=id, name=name, address=address, phone_number=phone_number, email_id=email_id, cuisine_type=cuisine_type)
            break
 
    # Return success response
    return jsonify({
        'success': True,
        'message': 'Restaurant updated successfully', 
        })

@app.route('/api/restaurant/get_all', methods=['GET'])
@cross_origin(supports_credentials=True)

def get_restaurants():
    return jsonify({
        'success': True,
        'restaurant_list': [restaurant.get_all_attributes() for restaurant in restaurant_list]
    })


@app.route('/api/restaurant/delete/<int:id>', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def delete_restaurants(id):

    for restaurant in restaurant_list:
        print(restaurant.id, id)
        if str(restaurant.id) == str(id):
            restaurant_list.remove(restaurant)
            break


    return jsonify({
        'success': True,
    })

if __name__ == "__main__":
    app.run(debug=True)