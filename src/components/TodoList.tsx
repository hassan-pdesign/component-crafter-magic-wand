
import React, { useState } from 'react';
import { Check, Undo, Bell, Mail, CircleCheck, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type TodoItem = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isCompleted: boolean;
  isDisabled?: boolean;
};

const TodoList: React.FC = () => {
  const { toast } = useToast();
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: 1,
      title: "Like a product on your store",
      description: "Try it — it'll show up here.",
      icon: <div className="text-green-500"><Check className="h-6 w-6" /></div>,
      isCompleted: true,
    },
    {
      id: 2,
      title: "Set up back-in-stock alerts",
      description: "Notify shoppers when items are available.",
      icon: <Bell className="h-5 w-5 text-slate-500" />,
      isCompleted: false,
    },
    {
      id: 3,
      title: "Connect Klaviyo or Postscript",
      description: "Sync wishlist data with your email platform.",
      icon: <Mail className="h-5 w-5 text-slate-500" />,
      isCompleted: false,
      isDisabled: true,
    },
    {
      id: 4,
      title: "Enable identity capture",
      description: "Know who's adding items to wishlists.",
      icon: <CircleCheck className="h-5 w-5 text-slate-500" />,
      isCompleted: false,
      isDisabled: true,
    },
    {
      id: 5,
      title: "Preview a test alert",
      description: "See how alerts will look to customers.",
      icon: <Bell className="h-5 w-5 text-slate-500" />,
      isCompleted: false,
      isDisabled: true,
    },
    {
      id: 6,
      title: "View wishlist engagement stats",
      description: "Check your wishlist performance.",
      icon: <BarChart3 className="h-5 w-5 text-slate-500" />,
      isCompleted: true,
    },
  ]);

  const completedCount = todos.filter(todo => todo.isCompleted).length;
  const totalCount = todos.length;

  const handleToggleComplete = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
    
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      toast({
        title: todo.isCompleted ? `Marked as incomplete: ${todo.title}` : `Completed: ${todo.title}`,
        duration: 2000,
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">To-Do List</h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">{completedCount} of {totalCount} completed</span>
          <Progress 
            value={(completedCount / totalCount) * 100} 
            className="w-32 h-2 bg-gray-200" 
          />
        </div>
      </div>

      <div className="space-y-4">
        {todos.map((todo) => (
          <div 
            key={todo.id} 
            className={cn(
              "border rounded-lg p-4 flex justify-between items-center",
              todo.isCompleted && !todo.isDisabled && "bg-green-50"
            )}
          >
            <div className="flex items-start gap-3">
              <div className="pt-0.5">
                {todo.icon}
              </div>
              <div>
                <h3 className="font-medium">{todo.title}</h3>
                <p className="text-gray-500 text-sm">{todo.description}</p>
              </div>
            </div>

            {todo.isDisabled ? (
              <Button variant="outline" disabled className="text-gray-400">
                Feature disabled
              </Button>
            ) : todo.isCompleted ? (
              <Button 
                variant="ghost"
                onClick={() => handleToggleComplete(todo.id)}
                className="text-gray-700 hover:bg-gray-100"
              >
                <Undo className="h-4 w-4 mr-2" />
                Undo
              </Button>
            ) : (
              <Button 
                variant="ghost"
                onClick={() => handleToggleComplete(todo.id)}
                className="text-gray-700 hover:bg-gray-100"
              >
                Complete
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
