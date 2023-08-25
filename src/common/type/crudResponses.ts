import { HttpStatus } from '@nestjs/common';

export const CrudResponse = {
  createResponse: {
    message: 'Create operation successful',
    statusCode: HttpStatus.CREATED,
  },
  updateResponse: {
    message: 'Update operation successful',
    statusCode: HttpStatus.OK,
  },


  deleteResponse: {
    message: 'Create operation successful',
    statusCode: HttpStatus.CREATED,
  },

  findResponse: { 
    message: 'Create operation successful',
    statusCode: HttpStatus.CREATED,
  }
}

