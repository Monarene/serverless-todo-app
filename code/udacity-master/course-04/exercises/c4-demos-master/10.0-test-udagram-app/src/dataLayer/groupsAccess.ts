import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Group } from '../models/Group'

const XAWS = AWSXRay.captureAWS(AWS)

export class GroupAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly groupsTable = process.env.GROUPS_TABLE
  ) {
    //
  }

  async getAllGroups(): Promise<Group[]> {
    console.log('Getting all groups')

    const result = await this.docClient
      .scan({
        TableName: this.groupsTable
      })
      .promise()

    const items = result.Items

    return items as Group[]
  }

  async createGroup(group: Group): Promise<Group> {
    console.log(`Creating a group with ID ${group.id}`)

    await this.docClient
      .put({
        TableName: this.groupsTable,
        Item: group
      })
      .promise()

    return group
  }
}

const createDynamoDBClient = () => {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')

    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}
