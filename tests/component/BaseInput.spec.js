import { render, screen, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom';
import BaseInput from '@/components/Base/BaseInput.vue';

describe('BaseInput components :', () => {
  test('should have label', () => {
    const label = 'label';
    render(BaseInput, {
      props: {
        id: '1546584',
        value: 'some value',
        label,
      },
    });

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(label)).toHaveTextContent('label');
  });

  test('should have icon', () => {
    render(BaseInput, {
      props: {
        id: '1546584',
        value: 'some value',
        appendIcon: true,
      },
    });

    expect(screen.getByTitle('append-icon')).toBeInTheDocument();
  });

  test('should have outlined classes & styles', () => {
    render(BaseInput, {
      props: {
        id: '1546584',
        value: 'some value',
        outlined: true,
        label: 'label',
      },
    });

    const input = screen.getByLabelText('label');
    const label = screen.getByText('label');

    expect(input).toHaveStyle('margin: auto');
    expect(label).toHaveClass('smallLabel--outlined label--outlined');
  });

  test('should clear input after click on clearable icon', async () => {
    render(BaseInput, {
      props: {
        id: '1546584',
        value: 'some value',
        clearable: true,
      },
    });

    const clearInputButton = screen.getByRole('clear-input');

    expect(clearInputButton).toBeInTheDocument();
    expect(screen.getByRole('input').value).toBe('some value');

    fireEvent.click(clearInputButton);
    const input = await screen.findByRole('input');
    expect(input.value).toBe('');
  });
});
