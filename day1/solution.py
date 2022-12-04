import numpy as np

with open('input.txt') as f:
    lines = f.readlines()

backpacker = 0
sum_calories = []
for line in lines:
    if(line.strip() == ""):
        sum_calories.append((backpacker))
        backpacker = 0
    else:
        backpacker += int(line)
    
print("Max:", np.sort(sum_calories)[::-1].max())
print("Sum of three:", np.sum(sum_calories[0:3]))