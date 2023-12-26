package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
)

// UserInfoResponse represents the structure of the user-info API response
type UserInfoResponse struct {
	Data struct {
		ID       string `json:"id"`
		SecUid   string `json:"secUid"`
		UniqueId string `json:"uniqueId"`
		Nickname string `json:"nickname"`
	} `json:"data"`
}

// UserFeedResponse represents the structure of the user-feed API response
type UserFeedResponse struct {
	Data struct {
		HasMore bool        `json:"hasMore"`
		Cursor  interface{} `json:"cursor"`
		ItemList interface{} `json:"itemList"`
	} `json:"data"`
}

func main() {
	// Get username from user input
	fmt.Print("Enter TikTok username: ")
	var username string
	fmt.Scanln(&username)

	// User Info Request
	userInfoResponse, err := http.Get(fmt.Sprintf("http://localhost:9876/tiktok/user-info?username=%s", username))
	if err != nil {
		fmt.Println("Error fetching user info:", err)
		return
	}
	defer userInfoResponse.Body.Close()

	userInfoData, err := ioutil.ReadAll(userInfoResponse.Body)
	if err != nil {
		fmt.Println("Error reading user info response:", err)
		return
	}

	var userInfo UserInfoResponse
	err = json.Unmarshal(userInfoData, &userInfo)
	if err != nil {
		fmt.Println("Error decoding user info response:", err)
		return
	}

	// Extract secUid from the user info response
	secUid := userInfo.Data.SecUid

	// Initialize variables
	cursor := 0
	var postList []interface{}

	// User Feed Request Loop
	for {
		// User Feed Request
		userFeedResponse, err := http.Get(fmt.Sprintf("http://localhost:9876/tiktok/user-feed?secUid=%s&cursor=%d", secUid, cursor))
		if err != nil {
			fmt.Println("Error fetching user feed:", err)
			return
		}
		defer userFeedResponse.Body.Close()

		userFeedData, err := ioutil.ReadAll(userFeedResponse.Body)
		if err != nil {
			fmt.Println("Error reading user feed response:", err)
			return
		}

		var userFeed UserFeedResponse
		err = json.Unmarshal(userFeedData, &userFeed)
		if err != nil {
			fmt.Println("Error decoding user feed response:", err)
			return
		}

		// Add items to postList
		postList = append(postList, userFeed.Data.ItemList.([]interface{})...)

		// Update cursor for the next request
		switch v := userFeed.Data.Cursor.(type) {
		case float64:
			cursor = int(v)
		case string:
			cursor, _ = strconv.Atoi(v)
		}

		// Check if there are no more items
		if cursor == 0 || !userFeed.Data.HasMore {
			break
		}
	}

	// Format the data
	data := map[string]interface{}{
		"id":         userInfo.Data.ID,
		"nickname":   userInfo.Data.Nickname,
		"uniqueId":   userInfo.Data.UniqueId,
		"itemLength": len(postList),
		"itemList":   postList,
	}

	// Output the data
	dataJSON, err := json.MarshalIndent(data,"","  ")
	if err != nil {
		fmt.Println("Error encoding data to JSON:", err)
		return
	}

	fmt.Println(string(dataJSON))
}
