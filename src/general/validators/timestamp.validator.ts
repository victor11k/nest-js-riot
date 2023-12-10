import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'timestamp', async: false })
export class TimestampValidator implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(timestamp: number, _arguments: ValidationArguments): boolean {
    const now = Date.now();
    // now is not in the future
    return timestamp < now;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public defaultMessage(_arguments: ValidationArguments): string {
    return 'Timestamp is not valid (in the future or older than 5 minutes)';
  }
}
