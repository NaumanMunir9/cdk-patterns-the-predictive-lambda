FROM public.ecr.aws/lambda/python3.6:latest

COPY deployment/app.py requirements.txt chipotle.pkl ./

RUN pip3 install -r requirements.txt

CMD ["app.lambdaHandler"]