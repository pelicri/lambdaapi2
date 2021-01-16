import json
#bibliteca de acessos ao EC2
import boto3


def lambda_handler(event, context):
    # Receber uma região - recebe via metodo GET no HEADER da API REST
    regiao = event['headers']['regiao']
    #instanciamos objeto de acesso ao serviço de EC2
    ec2 = boto3.client('ec2', region_name=regiao)
    # recebe as instancias via API describe/get de instancias em uma regiao
    instancias = ec2.describe_instance_status(IncludeAllInstances=True)
    
    return {
        'statusCode': 200,
        'body': instancias
    }
