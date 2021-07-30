package main

import (
	"sort"
	"strings"
	"strconv"
	"fmt"
)

type Pos struct {
	sum int
	pos int
	used []int
}

func sum(arr []int) int {
	var sum int = 0
	for _, v := range arr {
		sum += v
	}
	return sum
}

func sumSubsets(arr []int, num int) [][]int {
	var queue []Pos
	res := make(map[string][]int)
	
	if num == 0 {
			return [][]int{{}}
	}
	
	for idx := 0; idx < len(arr); idx++ {
			if arr[idx] < num {
					queue = append(queue, Pos{arr[idx], idx + 1, []int{ arr[idx] } })
			} else if arr[idx] == num {
					res[strconv.Itoa(arr[idx])] = []int{ arr[idx] }
			}
	}
	
	
	for len(queue) > 0 {
			cur := queue[0]
			queue = queue[1:]
			
			for idx := cur.pos; idx < len(arr); idx++ {
					if arr[idx] + cur.sum < num {
							var nn = make([]int, len(cur.used))
							copy(nn, cur.used)
							summ := arr[idx] + cur.sum
							queue = append(queue, Pos{summ, idx + 1, append(nn, arr[idx])})
					} else if arr[idx] + cur.sum == num {
							var nn = make([]int, len(cur.used))
							copy(nn, cur.used)
							rr := append(nn, arr[idx])
							res[strings.Trim(strings.Join(strings.Split(fmt.Sprint(rr), " "), ""), "[]")] = rr
					}
			}
	}
	var resV [][]int
	
	for _, v := range res {
			resV = append(resV, v)
	}
	
	
	sort.Slice(resV, func(i int, j int) bool { 
			for idx := 0; idx < len(resV[i]); idx++ {
					if len(resV[j]) > idx && resV[i][idx] < resV[j][idx] {
							return true
					} else if len(resV[j]) > idx && resV[i][idx] > resV[j][idx] {
							return false
					}
			}

			return false
	})
	return resV
}

func main() {
	fmt.Println(sumSubsets([]int{1, 1, 2, 4, 4, 4, 7, 9, 9, 13, 13, 13, 15, 15, 16, 16, 16, 19, 19, 20}, 36))
}