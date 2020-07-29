import boto3
import json


#region = 'us-east-1'
#instances = ['i-003f41702af731867']
    

def lambda_handler(event, context):    
    
    instance = [event['headers']['nomeinst']]
    regiao = event['headers']['regiao']
    ec2 = boto3.client('ec2', region_name=regiao)
    ec2.start_instances(InstanceIds=instance)

   
    #print('Instacia inicianda: ' + str(instances))
    app_json = json.dumps(event, sort_keys=True)
    resp = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
        },
        "instance_status": "Ativa",
        "instance_name": instance
        
    }
    
    return resp