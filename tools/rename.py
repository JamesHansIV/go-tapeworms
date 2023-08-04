import os

folder = '../app/public/images_rename'

for i, filename in enumerate(os.listdir(folder)):
    head, sep, tail = filename.partition("_SEM_")
    # print(head, sep, tail)
    new_name = head + sep + tail[0:4] + ".jpg"
    # print(head, sep, tail, new_name)
    print(new_name)
    os.rename(f"{folder}/{filename}", f"{folder}/{new_name}")