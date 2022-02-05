import joblib


def lambdaHandler(event, context):
    model = joblib.load("model/model.pkl")

    try:
        latitude = event["queryStringParameters"]["lat"]
    except KeyError:
        latitude = 0

    try:
        longitude = event["queryStringParameters"]["long"]
    except KeyError:
        longitude = 0

    prediction = model.predict([[latitude, longitude]])
    prediction = prediction.tolist()

    return {
        "statusCode": 200,
        "body": str(prediction[0]),
    }
