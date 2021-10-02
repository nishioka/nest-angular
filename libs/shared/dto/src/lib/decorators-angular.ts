/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNumberOptions, ValidationOptions } from 'class-validator';

export function ApiProperty(...args: unknown[]): PropertyDecorator {
  return function () {
    // do nothing
  };
}

export function Expose(): PropertyDecorator {
  return function () {
    // do nothing
  };
}

export function Type(): PropertyDecorator {
  return function () {
    // do nothing
  };
}

export function IsNumber(options?: IsNumberOptions, validationOptions?: ValidationOptions): PropertyDecorator {
  return function () {
    // do nothing
  };
}

export function IsString(validationOptions?: ValidationOptions): PropertyDecorator {
  return function () {
    // do nothing
  };
}

export function IsOptional(): PropertyDecorator {
  return function () {
    // do nothing
  };
}

export function IsDateString(): PropertyDecorator {
  return function () {
    // do nothing
  };
}

export function IsBoolean(): PropertyDecorator {
  return function () {
    // do nothing
  };
}

export function Length(min: number, max?: number, validationOptions?: ValidationOptions): PropertyDecorator {
  return function () {
    // do nothing
  };
}

export function IsNotEmpty(): PropertyDecorator {
  return function () {
    // do nothing
  };
}

export function IsEmail(): PropertyDecorator {
  return function () {
    // do nothing
  };
}
