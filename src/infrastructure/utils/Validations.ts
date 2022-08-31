import { ValidationError } from 'class-validator';
import { uniq, uniqBy } from 'lodash';

export const extractMessages = (errors: ValidationError[]): string[] => {
    return errors.reduce(
        (acum: string[], { children, constraints, property }) => {
            let messages: string[] = [];

            if (!!children.length) {
                const messagesFromChildren = extractMessages(children);
                messages = [...acum, ...messagesFromChildren];
            }

            if (constraints) {
                messages = uniqBy(
                    [
                        ...messages,
                        ...Object.keys(constraints).map(
                            (key) => constraints[key],
                        ),
                    ],
                    (message) => !message.includes(property),
                );
            }

            return uniq([...acum, ...messages]);
        },
        [],
    );
};
