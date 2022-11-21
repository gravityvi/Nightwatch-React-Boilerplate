import { fireEvent, within } from '@testing-library/dom';
import Form from '../../../src/components/Form.jsx';

export default {
  title: 'Form Component',
  component: Form
};

export const EmptyForm = Object.assign(() => <Form />, {
  test: async (browser, { component }) => {
    await expect(component).to.be.visible;
    await expect(component.find('button')).to.not.be.enabled;
  }
});

export const FilledForm = Object.assign(
  () => (
    <Form
      addTask={function (value) {
        console.log('Add Task', value);
      }}
    />
  ),
  {
    async play({ canvasElement, args }) {
      const root = within(canvasElement);
      const input = root.getByTestId('new-todo-input');

      fireEvent.change(input, {
        target: {
          value: 'another one bites the dust'
        }
      });

      return {
        fromPlay: input
      };
    },

    test: async (browser, { component, result }) => {
      await expect(component).to.be.visible;

      await expect(component.find('input'))
        .to.have.property('value')
        .equal('another one bites the dust');
      await expect(component.find('button')).to.be.enabled;
    }
  }
);
