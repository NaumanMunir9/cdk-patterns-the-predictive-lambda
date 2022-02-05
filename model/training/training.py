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

