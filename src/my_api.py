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
    



restaurant_list = []

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
        if restaurant.id == id:
            restaurant_list.remove(restaurant)
            break


    return jsonify({
        'success': True,
    })

if __name__ == "__main__":
    app.run(debug=True)