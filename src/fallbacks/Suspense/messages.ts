import { defineMessages, MessageDescriptor } from 'react-intl';

export const messages = defineMessages({
  firstAnim: {
    id: 'app.suspense.fallback.firstAnim',
    defaultMessage: 'TH',
  },
  secondAnim: {
    id: 'app.suspense.fallback.secondAnim',
    defaultMessage: 'E{whitespace}',
  },
  thirdAnim: {
    id: 'app.suspense.fallback.thirdAnim',
    defaultMessage: 'SEASON',
  },
  fourthAnim: {
    id: 'app.suspense.fallback.fourthAnim',
    defaultMessage: 'ED{whitespace}',
  },
  fifthAnim: {
    id: 'app.suspense.fallback.fifthAnim',
    defaultMessage: 'DEV',
  },
}) as Record<string, MessageDescriptor>;
