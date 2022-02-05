import { Stack, StackProps } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class ThePredictiveLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // ======================================================================
    /**
     * The Lambda function that will be called by the API Gateway
     */
    const PredictiveLambda = new lambda.DockerImageFunction(
      this,
      "PredictiveLambda",
      {
        code: lambda.DockerImageCode.fromImageAsset("model"),
        memorySize: 4096,
        timeout: cdk.Duration.seconds(10),
      }
    );
  }
}
