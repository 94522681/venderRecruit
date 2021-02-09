#### 约束和使用规范

1. 建议基础类型可以类型推导的不需要显示的指定类型，可以让编辑器自己推导
    ```typescript
      const name: string = 'xiaoMing'  // bad
      const name = 'xiaoMing' // good
    ```

2. 函数一定要定义入参的类型和函数返回
    ```typescript
      function sayName (name: string): string {
        return name
      }
    ```

3. 定义 `interface` 和 `type` 的时候首字母要大写，推荐使用大写 `I` 或 `T` 开头
    ```typescript
      interface IUser {
        id: string
        name: string
        age: number
      }

      type TOrder = {
        id: string
        name: string
      }
    ```
4. `react` 中常用写法定义
    ```tsx
      // 组件定义， 写法一
      interface ComponentName {
        props: IProps
        state: IState
      }
      class ComponentName extends React.Component {}

      // 组件定义， 写法二
      interface IProps {}
      interface IState {}
      class ComponentName extends React.Component<IProps, IState> {}

      // hook 类型定义
      interface IUser {
        name: string;
        age: number
      }
      function ComponentName (): JSX.Element {
        const [name, setName] = useState<string>('xiaoMing')
        const [user, setUser] = useState<IUser>({ name: 'xiaoMing', age: 18 })
        return ...
      }

    ```

5. 常用工具泛型定义 **(以下定义可直接在代码中使用， 不需要重新定义)**
    1.  `Promise<T>` 类型定义，`T` 代表 `Promise` 返回的类型
        ```typescript
        function (name: string): Promise<string> // 定义函数返回Promise，参数为string类型
        ```

    2. `ArrayLike<T>` 类数组数据类型定义
        ```typescript
          function Foo (): void {
            let params: ArrayLike<string> = arguments
          }
        ```

    3. `Partial<T>` 将类型 `T` 全部转换为  **可选类型**
        ```typescript
          interface IUser {
            name: string
            age: number
          }

          // { name?: string; age?: number }
          type INewUser = Partial<IUser>
        ```
      
      4. `Required<T>` 将类型 `T` 全部转换为 **必须类型**
         ```typescript
            interface IUser {
              name?: string
              age: number
            }

            // { name: string; age: number }
            type INewUser = Required<IUser>
         ```

      5. `Readonly<T>` 将类型 `T` 全部转换为 **只读类型**
          ```typescript
            interface IUser {
              name: string
              age: number
            }

            // { readonly name: string; readonly age: number }
            type INewUser = Readonly<IUser>
          ```

      6. `Pick<T, K extends keyof T>` 从 `T` 中，选择一组在并集 `K` 中的属性
          ```typescript
            interface IUser {
              name: string
              age: number
              sex: 'man' | 'female'
            }

            // { name: string; age: number }
            type INewUser = Pick<IUser, 'name' | 'age'>
          ```

      7. `Record<K extends keyof any, T>` 用类型 T 的一组属性 K 构造一个类型
          ```typescript
            interface IOrderKey {
              order1: any
              order2: any
            }

            interface IOrder {
              id: string
              price: number
            }
            // { order1: IOrder; order2: IOrder }
            type IOrderList = Record<keyof IOrderKey, IOrder>
          ```

      8. `Exclude<T, U>` 从 T 中排除那些可分配给 U 的类型
          ```typescript
            type Exclude<T, U> = T extends U ? never : T;
          ```

      9. `Extract<T, U>` 从 T 中提取那些可分配给 U 的类型
          ```typescript
            type Extract<T, U> = T extends U ? T : never;
          ```

      10. `Omit<T, K extends keyof any>` 构造一个具有 T 属性的类型，但 K 类型中的属性除外。
          ```typescript
            type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
          ```

      11. `NonNullable<T>` 从 T 中排除 null 和未定义
          ```typescript
            type NonNullable<T> = T extends null | undefined ? never : T;
          ```