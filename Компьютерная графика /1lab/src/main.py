import matplotlib.pyplot as plt
import numpy as np

i = 1

# while True:
x = np.linspace(0, 2, 100)

if i < 10:
    i += 1
else:
    i = 1

plt.plot(x, x**i, label='linear')
# plt.plot(x, x**2, label='quadratic')
# plt.plot(x, x**3, label='cubic')

plt.xlabel('x jopa')
plt.ylabel('y label')

plt.title("Simple Plot")

plt.legend()

plt.show()
