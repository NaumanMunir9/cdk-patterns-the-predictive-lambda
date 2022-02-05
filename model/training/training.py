import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
import joblib


def load_chipotle_data():
    """
    Loads the data from the csv file and returns the dataframe
    """
    return pd.read_csv("chipotle_stores.csv")


# clean out the data
store = load_chipotle_data()
stripped_store = store[["address", "latitude", "longitude"]].copy()
stripped_store = stripped_store.drop_duplicates(keep="first")

# split the data into training and testing
train_set, test_set = train_test_split(stripped_store, test_size=0.2, random_state=42)

# split data from labels
train_set_no_labels = train_set.drop("address", axis=1)
train_set_labels = train_set["address"].copy()

# train the model
model = KNeighborsClassifier(n_neighbors=2, weights="distance", algorithm="auto")
model.fit(train_set_no_labels, train_set_labels)

# export the model
joblib.dump(model, "chipotle.pkl")
